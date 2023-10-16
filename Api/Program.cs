using Api;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCognitoIdentity();

//builder.Services.AddDbContext<WebApiContext>(options => options.UseNpgsql(configuration.GetConnectionString("RdsPostgres")));
builder.Services.AddDbContext<WebApiContext>(options => options.UseNpgsql(builder.Configuration.GetValue<string>("RdsPostgres")));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.Authority = builder.Configuration.GetValue<string>("AWSCognito:Authority");
    //options.Authority = configuration["AWSCognito:Authority"];
    options.Audience = builder.Configuration.GetValue<string>("AWSCognito:AppClientId");
    //options.Audience = configuration["AWSCognito:AppClientId"];
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8
                            .GetBytes(builder.Configuration.GetValue<string>("AppSettings:Token"))),
                            //.GetBytes(configuration.GetSection("AppSettings:Token").Value)),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

builder.Services.AddCors(cors =>
{
    cors.AddPolicy("CorsPolicy", b => b
        .AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
