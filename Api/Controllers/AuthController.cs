using Amazon;
using Amazon.CognitoIdentityProvider;
using Amazon.CognitoIdentityProvider.Model;
using Api.Dtos.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IAmazonCognitoIdentityProvider cognitoService;
        private readonly IConfiguration configuration;
        private readonly RegionEndpoint Region = RegionEndpoint.EUNorth1;

        public AuthController(IAmazonCognitoIdentityProvider cognitoService, IConfiguration configuration)
        {
            this.cognitoService = cognitoService;
            this.configuration = configuration;
        }

        [HttpPost]
        [Route("/sign-in")]
        public async Task<InitiateAuthResponse> InitiateAuthAsync(SignIn userData)
        {
            var authParameters = new Dictionary<string, string>
            {
                { "USERNAME", userData.Email },
                { "PASSWORD", userData.Password }
            };

            var authRequest = new InitiateAuthRequest

            {
                ClientId = configuration["AWSCognito:AppClientId"],
                AuthParameters = authParameters,
                AuthFlow = AuthFlowType.USER_PASSWORD_AUTH
            };

            var response = await cognitoService.InitiateAuthAsync(authRequest);
            Console.WriteLine($"Result Challenge is : {response.ChallengeName}");

            return response;
        }

        [HttpPost]
        [Route("/sign-up")]
        public async Task<ActionResult<string>> SignUp(SignUp user)
        {
            var cognito = new AmazonCognitoIdentityProviderClient(Region);
            var request = new SignUpRequest
            {
                ClientId = configuration["AWSCognito:AppClientId"],
                Password = user.Password,
                Username = user.Email,
                UserAttributes = new List<AttributeType>()
                {
                    new AttributeType { Name = "family_name", Value = user.FamilyName  },
                    new AttributeType { Name = "given_name", Value = user.GivenName  },
                    new AttributeType { Name = "email", Value = user.Email  }
                }
            };

            var response = await cognito.SignUpAsync(request);

            return Ok(response);
        }

        [HttpPost]
        [Route("/sign-up/resend-code")]
        public async Task<CodeDeliveryDetailsType> ResendConfirmationCodeAsync(string email)
        {
            var codeRequest = new ResendConfirmationCodeRequest
            {
                ClientId = configuration["AWSCognito:AppClientId"],
                Username = email,
            };

            var response = await cognitoService.ResendConfirmationCodeAsync(codeRequest);

            Console.WriteLine($"Method of delivery is {response.CodeDeliveryDetails.DeliveryMedium}");

            return response.CodeDeliveryDetails;
        }

        [HttpPost]
        [Route("/sign-up/confirm")]
        public ActionResult<string> Confirm([FromQuery] string confirmationCode, [FromQuery] string email)
        {
            var confirmationLink = configuration["AWSCognito:ConfirmationLink"]
                .Replace("{email}", email)
                .Replace("{cognito_confirmation_code}", confirmationCode);


            return Ok(confirmationLink);
        }
    }
}
