using System.Collections.Generic;

namespace rest_api.Models
{
    public class Menu
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int SmallPrice { get; set; }
        public int LargePrice { get; set; }
        public string Category { get; set; }
    }
}