using System.Threading.Tasks;
using rest_api.Dtos.Character;
using rest_api.Dtos.CharacterSkill;
using rest_api.Models;

namespace rest_api.Services.CharacterSkillService
{
    public interface ICharacterSkillService
    {
         Task<ServiceResponse<GetCharacterDto>> AddCharacterSkill(AddCharacterSkillDto newCharacterSkill);
    }
}