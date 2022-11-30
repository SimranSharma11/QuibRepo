using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace App.Data.Migrations
{
    public partial class Third : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropTable(
            //    name: "movies");

            migrationBuilder.CreateTable(
                name: "MostActiveQuibs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    MovieId = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Length = table.Column<int>(type: "int", nullable: false),
                    PosterContentThumb = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ReleaseYear = table.Column<int>(type: "int", nullable: false),
                    Director = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsActive = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MostActiveQuibs", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "recentquibs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    MovieId = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Length = table.Column<int>(type: "int", nullable: false),
                    PosterContentThumb = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ReleaseYear = table.Column<int>(type: "int", nullable: false),
                    Director = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsActive = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_recentquibs", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MostActiveQuibs");

            migrationBuilder.DropTable(
                name: "recentquibs");

            //    migrationBuilder.CreateTable(
            //        name: "movies",
            //        columns: table => new
            //        {
            //            Id = table.Column<int>(type: "int", nullable: false)
            //                .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
            //            CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true),
            //            Director = table.Column<string>(type: "longtext", nullable: true)
            //                .Annotation("MySql:CharSet", "utf8mb4"),
            //            IsActive = table.Column<bool>(type: "tinyint(1)", nullable: true),
            //            Length = table.Column<int>(type: "int", nullable: true),
            //            ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: true),
            //            PosterContent = table.Column<string>(type: "longtext", nullable: true)
            //                .Annotation("MySql:CharSet", "utf8mb4"),
            //            PosterContentThumb = table.Column<string>(type: "longtext", nullable: true)
            //                .Annotation("MySql:CharSet", "utf8mb4"),
            //            ReleaseYear = table.Column<int>(type: "int", nullable: true),
            //            Title = table.Column<string>(type: "longtext", nullable: true)
            //                .Annotation("MySql:CharSet", "utf8mb4")
            //        },
            //        constraints: table =>
            //        {
            //            table.PrimaryKey("PK_movies", x => x.Id);
            //        })
            //        .Annotation("MySql:CharSet", "utf8mb4");
            //}
        }
    }
}
