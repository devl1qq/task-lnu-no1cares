using Api.Data;
using Api.Dtos.Items;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ItemsController : Controller
{
    private readonly DataContext _dataContext;

    public ItemsController(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<ItemsResponse>> GetItems(
        [FromQuery] Guid id)
    {
        var path = _dataContext.Items
            .Include(item => item.Path)
            .Single(item => item.Id == id).Path;

        var items = await _dataContext.Items
            .Where(item => item.ParentId == id)
            .ToListAsync();

        return new ItemsResponse(path, items);
    }
}
