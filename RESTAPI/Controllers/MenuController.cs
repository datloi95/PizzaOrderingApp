using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using rest_api.Dtos.Menu;
using rest_api.Models;
using rest_api.Services.MenuService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace rest_api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class MenuController : ControllerBase
    {
        private readonly IMenuService _MenuService;

        public MenuController(IMenuService MenuService)
        {

            _MenuService = MenuService;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> Get()
        {
            var name = User.Identity.Name;
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            return Ok(await _MenuService.GetAllItems());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSingle(int id)
        {
            return Ok(await _MenuService.GetItemById(id));
        }

        [HttpPost("addmenu")]
        public async Task<IActionResult> AddMenu(MenuDto newMenu)
        {
            return Ok(await _MenuService.AddItem(newMenu));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateMenu(MenuDto updatedMenu)
        {
            ServiceResponse<MenuDto> response = await _MenuService.UpdateItem(updatedMenu);
            if (response.Data == null)
            {
                return NotFound(response);
            }
            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            ServiceResponse<List<MenuDto>> response = await _MenuService.DeleteItem(id);
            if (response.Data == null)
            {
                return NotFound(response);
            }
            return Ok(response);
        }
    }
}