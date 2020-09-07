using System.Linq;
using AutoMapper;
using rest_api.Dtos.Character;
using rest_api.Dtos.Fight;
using rest_api.Dtos.Menu;
using rest_api.Dtos.Skill;
using rest_api.Dtos.Weapon;
using rest_api.Models;

namespace rest_api
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<MenuDto, Menu>();
            CreateMap<Character, GetCharacterDto>()
                .ForMember(dto => dto.Skills, c => c.MapFrom(c => c.CharacterSkills.Select(cs => cs.Skill)));
            CreateMap<AddCharacterDto, Character>();
            CreateMap<Weapon, GetWeaponDto>();
            CreateMap<Skill, GetSkillDto>();
            CreateMap<Character, HighscoreDto>();
        }
    }
}