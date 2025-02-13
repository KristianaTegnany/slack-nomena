import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Post()
  create(@Body() createWorkspaceDto: CreateWorkspaceDto) {
    console.log({ createWorkspaceDto });
    return this.workspacesService.create(createWorkspaceDto);
  }

  @Get('/by-userid/:userid')
  findByUserId(@Param('userid') userid: string) {
    return this.workspacesService.findByUserId(userid);
  }

  @Get('/by-id/:id')
  findByid(@Param('id') id: string) {
    return this.workspacesService.findWorkspaceById(id)
  }

  @Patch()
  update(@Body() updateWorkspaceDto: UpdateWorkspaceDto) {
    return this.workspacesService.update(updateWorkspaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workspacesService.remove(id);
  }
}
