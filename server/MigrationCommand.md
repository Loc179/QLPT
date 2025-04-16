# Migrations

## 1. Using the CLI

### Add a migration
```bash
dotnet ef migrations add [MigrationName] --project QLPT.Data --startup-project QLPT.API --context QlptDbContext --output-dir Migrations
```

### Update the database
```bash
dotnet ef database update --project QLPT.Data --startup-project QLPT.API --context QlptDbContext
```

### Roll back a migration 
```bash
dotnet ef database update [MigrationName] --project QLPT.Data --startup-project QLPT.API --context QlptDbContext
```

### Drop the database 
```bash
dotnet ef database drop --project QLPT.Data --startup-project QLPT.API --context QlptDbContext
```

### Remove a migration
```bash
dotnet ef migrations remove --project QLPT.Data --startup-project QLPT.API --context QlptDbContext
```

## 2. Using the Package Manager Console
### Add a migration
```bash
Add-Migration [MigrationName] -Project QLPT.Data -StartupProject QLPT.API -Context QlptDbContext -OutputDir QLPT.Data/Migrations
```

### Update the database
```bash
Update-Database -Project QLPT.Data -StartupProject QLPT.API -Context QlptDbContext
```

### Roll back a migration
```bash
Update-Database [MigrationName] -Project QLPT.Data -StartupProject QLPT.API -Context QlptDbContext
```

### Remove a migration
```bash
Remove-Migration -Project QLPT.Data -StartupProject QLPT.API -Context QlptDbContext
```

[]: # Path: README.md
