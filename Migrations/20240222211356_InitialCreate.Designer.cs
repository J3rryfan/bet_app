﻿// <auto-generated />
using BetApp.Web.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace BetApp.Web.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20240222211356_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("BetApp.Web.Models.Bet", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("HighestBid")
                        .HasColumnType("integer");

                    b.Property<string>("Item")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Bets");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            HighestBid = 100,
                            Item = "Shoes",
                            UserId = 1
                        },
                        new
                        {
                            Id = 2,
                            HighestBid = 200,
                            Item = "Ring",
                            UserId = 2
                        },
                        new
                        {
                            Id = 3,
                            HighestBid = 300,
                            Item = "Telephone",
                            UserId = 3
                        },
                        new
                        {
                            Id = 4,
                            HighestBid = 400,
                            Item = "Milk",
                            UserId = 4
                        },
                        new
                        {
                            Id = 5,
                            HighestBid = 500,
                            Item = "pants",
                            UserId = 5
                        });
                });

            modelBuilder.Entity("BetApp.Web.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Username = "John Doe"
                        },
                        new
                        {
                            Id = 2,
                            Username = "Jane Doe"
                        },
                        new
                        {
                            Id = 3,
                            Username = "Jerry Fan"
                        },
                        new
                        {
                            Id = 4,
                            Username = "Michael"
                        },
                        new
                        {
                            Id = 5,
                            Username = "Scott"
                        });
                });

            modelBuilder.Entity("BetApp.Web.Models.Bet", b =>
                {
                    b.HasOne("BetApp.Web.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });
#pragma warning restore 612, 618
        }
    }
}
