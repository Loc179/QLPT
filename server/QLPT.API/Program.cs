using System.Reflection;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using QLPT.API.Config;
using QLPT.Business;
using QLPT.Business.Handlers;
using QLPT.Business.Mappings;
using QLPT.Business.Services;
using QLPT.Data;
using QLPT.Data.UnitOfWorks;
using QLPT.Models.Entities;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<VNPayConfig>(builder.Configuration.GetSection("VNPay"));
builder.Services.Configure<AppSetting>(builder.Configuration);
var appSetting = builder.Configuration.Get<AppSetting>();

builder.Services.Configure<CloudinarySettings>(
    builder.Configuration.GetSection("CloudinarySettings"));

builder.Services.AddScoped<IImageHostingService, CloudinaryService>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularClient", policy =>
    {
        policy.WithOrigins("http://localhost:4200", "https://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});


builder.Services.AddDbContext<QlptDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new() { Title = "QLPT Web API", Version = "v1" });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter into field the JWT",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] { }
        }
    });

    // var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    // var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);

    // options.IncludeXmlComments(xmlPath);
});

// Add AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile).Assembly);

builder.Services.AddHttpContextAccessor();

builder.Services.AddScoped<IUnitOfWorks, UnitOfWorks>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IVnPayService, VnPayService>();
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(LoginCommandHandler).Assembly));
builder.Services.AddHostedService<ServicePackageExpiryNotification>();

builder.Services.AddIdentity<User, Role>(options =>
{
    options.SignIn.RequireConfirmedEmail = false;
    options.User.RequireUniqueEmail = true;
}).AddEntityFrameworkStores<QlptDbContext>()
    .AddDefaultTokenProviders();


builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = appSetting!.Jwt.ValidIssuer,
            ValidAudience = appSetting!.Jwt.ValidAudience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appSetting.Jwt.Secret)
                ?? throw new InvalidOperationException("JWT:Secret is not configured.")),
        };
    });


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<QlptDbContext>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<Role>>();
    await SeedData.SeedAsync(dbContext, userManager, roleManager);
}


app.UseHttpsRedirection();

app.UseCors("AllowAngularClient");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

await app.RunAsync();
