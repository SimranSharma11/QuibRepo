
using App.Models.DataModels;
using App.Models.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Data
{
    public class AppDbContext : IdentityDbContext<IdentityUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
     
        public DbSet<ApplicationUser> applicationUsers { get; set; }
        public DbSet<RecentQuibs> recentquibs { get; set; }
        public DbSet<MostActiveQuibs> MostActiveQuibs { get; set; }
        public DbSet<movies> movies { get; set; }
        public DbSet<Movie> movie { get; set; }
        public DbSet<QuibStream> quibStreams { get; set; }

        public DbSet<quibs> quibs { get; set; }
        public DbSet<time> Time { get; set; }
        public DbSet<Length> length { get; set; }
        public DbSet<Poster> posters { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
           
            base.OnModelCreating(builder);
            builder.Entity<movies>().ToTable("movies");
            builder.Entity<QuibStream>().ToTable("QuibStream").HasNoKey();
            builder.Entity<ApplicationUser>()
                 .Property(e => e.IsAdmin);

            builder.Entity<ApplicationUser>()
                .Property(e => e.CreatedDate);

            builder.Entity<ApplicationUser>()
                .Property(e => e.ModifiedDate);

            builder.Entity<ApplicationUser>()
              .Property(e => e.FirstName)
              .HasMaxLength(250);

            builder.Entity<ApplicationUser>()
           .Property(e => e.LastName)
           .HasMaxLength(250);

            builder.Entity<ApplicationUser>()
              .Property(e => e.IsEnabled);

            builder.Entity<ApplicationUser>()
              .Property(e => e.AvatarBase32ImagePath)
              .HasMaxLength(1000);

            builder.Entity<ApplicationUser>()
             .Property(e => e.AvatarBase256ImagePath)
             .HasMaxLength(1000);
         
        }
       
    }

}
