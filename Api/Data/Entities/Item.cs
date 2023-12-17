namespace Api.Data.Entities;

public class Item
{
    public Guid Id { get; set; }
    public Guid? ParentId { get; set; } // null == root
    public Path Path { get; set; }
    public string Name { get; set; }
    public ItemType Type { get; set; }
    public DateTime Date { get; set; }
    public long Size { get; set; }
}

public class Path
{
    public IEnumerable<PathItem> Segments { get; set; }
}

public class PathItem
{
    public Guid Id { get; set; }
    public string Name { get; set; }
}
