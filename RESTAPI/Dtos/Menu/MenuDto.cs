using rest_api.Models;

namespace rest_api.Dtos.Menu
{
    public class MenuDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int SmallPrice { get; set; }
        public int LargePrice { get; set; }
        public string Category { get; set; }
    }
}