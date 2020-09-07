using System.Collections.Generic;
using System.Threading.Tasks;
using rest_api.Dtos.Character;
using rest_api.Dtos.Menu;
using rest_api.Models;

namespace rest_api.Services.MenuService
{
    public interface IMenuService
    {
         Task<ServiceResponse<List<MenuDto>>> GetAllItems();
         Task<ServiceResponse<MenuDto>> GetItemById(int id);
         Task<ServiceResponse<List<MenuDto>>> AddItem(MenuDto newitem);
         Task<ServiceResponse<MenuDto>> UpdateItem(MenuDto updatedItem);
         Task<ServiceResponse<List<MenuDto>>> DeleteItem(int id);
    }
}