using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using rest_api.Data;
using rest_api.Dtos.Character;
using rest_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using rest_api.Services.MenuService;
using rest_api.Dtos.Menu;

namespace rest_api.Services.MenuService
{
    public class MenuService : IMenuService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public MenuService(IMapper mapper, DataContext context, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
            _mapper = mapper;
        }

        private int GetUserId() => int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));

        public async Task<ServiceResponse<List<MenuDto>>> AddItem(MenuDto newItem)
        {
            ServiceResponse<List<MenuDto>> serviceResponse = new ServiceResponse<List<MenuDto>>();
            Menu item = _mapper.Map<Menu>(newItem);

            await _context.Menu.AddAsync(item);
            await _context.SaveChangesAsync();
            serviceResponse.Data = new List<MenuDto>();
            serviceResponse.Data.Add(newItem);
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<MenuDto>>> DeleteItem(int id)
        {
            ServiceResponse<List<MenuDto>> serviceResponse = new ServiceResponse<List<MenuDto>>();
            try
            {
                Character character = await _context.Characters
                    .FirstOrDefaultAsync(c => c.Id == id && c.User.Id == GetUserId());
                if (character != null)
                {
                    _context.Characters.Remove(character);
                    await _context.SaveChangesAsync();
                    serviceResponse.Data = (_context.Characters.Where(c => c.User.Id == GetUserId())
                        .Select(c => _mapper.Map<MenuDto>(c))).ToList();
                }
                else
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Character not found.";
                }
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<MenuDto>>> GetAllItems()
        {
            ServiceResponse<List<MenuDto>> serviceResponse = new ServiceResponse<List<MenuDto>>();
            List<Character> dbCharacters = await _context.Characters.Where(c => c.User.Id == GetUserId()).ToListAsync();
            serviceResponse.Data = (dbCharacters.Select(c => _mapper.Map<MenuDto>(c))).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<MenuDto>> GetItemById(int id)
        {
            ServiceResponse<MenuDto> serviceResponse = new ServiceResponse<MenuDto>();
            Character dbCharacter = await _context.Characters
                .FirstOrDefaultAsync(c => c.Id == id && c.User.Id == GetUserId());
            serviceResponse.Data = _mapper.Map<MenuDto>(dbCharacter);
            return serviceResponse;
        }

        public async Task<ServiceResponse<MenuDto>> UpdateItem(MenuDto updatedItem)
        {
            ServiceResponse<MenuDto> serviceResponse = new ServiceResponse<MenuDto>();
            try
            {
                Menu item = await _context.Menu.FirstOrDefaultAsync(c => c.Id == updatedItem.Id);
                if (item.Id == GetUserId())
                {
                    item.Name = updatedItem.Name;
                    item.SmallPrice = updatedItem.SmallPrice;
                    item.LargePrice = updatedItem.LargePrice;
                    item.Category = updatedItem.Category;

                    _context.Menu.Update(item);
                    await _context.SaveChangesAsync();

                    serviceResponse.Data = _mapper.Map<MenuDto>(item);
                }
                else
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Menu item not found.";
                }
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }
    }
}