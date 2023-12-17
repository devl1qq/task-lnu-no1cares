using Api.Data.Entities;
using Path = Api.Data.Entities.Path;

namespace Api.Dtos.Items;

public record ItemsResponse(
    Path Path,
    IEnumerable<Item> Items);
