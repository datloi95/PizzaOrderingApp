using System.Threading.Tasks;
using rest_api.Dtos.Character;
using rest_api.Dtos.Weapon;
using rest_api.Models;

namespace rest_api.Services.WeaponService
{
    public interface IWeaponService
    {
         Task<ServiceResponse<GetCharacterDto>> AddWeapon(AddWeaponDto newWeapon);
    }
}