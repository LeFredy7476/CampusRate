import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PlacesService } from './places.service.js';
import { CreatePlaceDto } from './dto/create-place.dto.js';
import { UpdatePlaceDto } from './dto/update-place.dto.js';
import { QueryPlaceDto } from './dto/query-place.dto.js';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post()
  async create(@Body() createPlaceDto: CreatePlaceDto) {
    console.log("creating place: " + createPlaceDto);
    return this.placesService.create(createPlaceDto);
  }

  @Get()
  async findAll(@Query() queryDto: QueryPlaceDto) {
    return this.placesService.findAll(queryDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.placesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    return this.placesService.update(id, updatePlaceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.placesService.remove(id);
  }
}
