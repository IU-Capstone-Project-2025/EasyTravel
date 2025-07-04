from typing import Dict, List
from app.models.InterestsEnum import InterestsEnum

# Для каждого интереса определяем список OpenStreetMap-подобных тегов,
# которыми помечены POI в нашем датасете.
interest_tags: Dict[InterestsEnum, List[str]] = {
    InterestsEnum.MUSEUMS:      ["tourism:museum", "historic:monument"],
    InterestsEnum.ART:          ["tourism:artwork", "historic:memorial"],
    InterestsEnum.HISTORY:      ["historic:yes", "historic:archaeological_site"],
    InterestsEnum.ARCHITECTURE: ["building:architecture", "historic:yes"],
    InterestsEnum.NATURE:       ["natural:wood", "natural:water", "natural:peak"],
    InterestsEnum.PARKS:        ["leisure:park"],
    InterestsEnum.CAFES:        ["amenity:cafe"],
    InterestsEnum.RESTAURANTS:  ["amenity:restaurant", "cuisine:*"],  # * — wildcard
    InterestsEnum.SHOPPING:     ["shop:*"],
    InterestsEnum.SPORTS:       ["leisure:stadium", "leisure:sports_centre"],
    InterestsEnum.ACTIVE:       ["leisure:fitness_station", "leisure:trail"],
    InterestsEnum.RECREATION:   ["amenity:playground", "leisure:park"],
    InterestsEnum.NIGHTLIFE:    ["amenity:bar", "amenity:nightclub"],
    InterestsEnum.LOCAL:        ["tourism:attraction"],
    InterestsEnum.CUISINE:      ["cuisine:*"],
    InterestsEnum.PHOTOGRAPHY:  ["tourism:viewpoint"],
    InterestsEnum.QUIET:        ["amenity:bench", "leisure:park"],
    InterestsEnum.PLACES:       ["tourism:attraction"],
}
