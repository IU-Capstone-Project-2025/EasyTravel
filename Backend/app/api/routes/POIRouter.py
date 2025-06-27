from fastapi import APIRouter, Query
from typing import Optional, List

from app.models.dtoModels.POIOutDTO import POIOutDTO
from app.services.POIService import search_in_city

router = APIRouter(prefix="/api/poi")

@router.get("/", response_model=List[POIOutDTO])
async def search_poi(
    q: str = Query(..., alias="q"),
    city: Optional[str] = None,
    limit: int = Query(10, ge=1, le=50)
):
    return search_in_city(query=q, city=city, top_n=limit)
