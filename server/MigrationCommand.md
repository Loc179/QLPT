# Migrations

## 1. Using the CLI

### Add a migration
```bash
dotnet ef migrations add [MigrationName] --project QLPT.Data --startup-project QLPT.API --context ApplicationDbContext --output-dir Migrations
```

### Update the database
```bash
dotnet ef database update --project QLPT.Data --startup-project QLPT.API --context ApplicationDbContext
dotnet ef database update --project QLPT.Data --startup-project QLPT.API --context StorageDbContext
```

### Roll back a migration 
```bash
dotnet ef database update [MigrationName] --project QLPT.Data --startup-project QLPT.API --context ApplicationDbContext
dotnet ef database update [MigrationName] --project QLPT.Data --startup-project QLPT.API --context StorageDbContext
```

### Drop the database 
```bash
dotnet ef database drop --project QLPT.Data --startup-project QLPT.API --context ApplicationDbContext
dotnet ef database drop --project QLPT.Data --startup-project QLPT.API --context StorageDbContext
```

### Remove a migration
```bash
dotnet ef migrations remove --project QLPT.Data --startup-project QLPT.API --context ApplicationDbContext
dotnet ef migrations remove --project QLPT.Data --startup-project QLPT.API --context StorageDbContext
```

## 2. Using the Package Manager Console
### Add a migration
```bash
Add-Migration [MigrationName] -Project QLPT.Data -StartupProject QLPT.API -Context ApplicationDbContext -OutputDir QLPT.Data/Migrations
```

### Update the database
```bash
Update-Database -Project QLPT.Data -StartupProject QLPT.API -Context ApplicationDbContext
```

### Roll back a migration
```bash
Update-Database [MigrationName] -Project QLPT.Data -StartupProject QLPT.API -Context ApplicationDbContext
```

### Remove a migration
```bash
Remove-Migration -Project QLPT.Data -StartupProject QLPT.API -Context ApplicationDbContext
```

[]: # Path: README.md
