﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QLPT.Data.Migrations
{
    /// <inheritdoc />
    public partial class RemoveQuantityInRoomService : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "RoomServices");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "RoomServices",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
