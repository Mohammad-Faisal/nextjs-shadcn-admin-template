# How to Do Migrations in Prisma

Prisma is a great choice to make database calls easy.

But Migrations can be tricky.

In most serious companies, you are not even allowed to touch the production database. Many companies are still managing migrations manually by running database scripts.

But you will still need the knowledge

## Scenario 1: You want to add a new field to the table.

To add a new column to the table, open up the `schema.prisma` file under the `prisma` directory.

Let's say we want to add the new field `rating` to our Post Table.

### Update schema

Add the new column to the schema.

```prisma
model Post {
  rating Int @default(0)
  //... other fields
}
```

### Bash into the container

Now, shell into the `config-service` container,

```bash
docker exec -it <container name or id> /bin/sh
```

To get the id of the container you can run the following command

```sh
docker ps
```

It will give you the container list

```table
CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES

7c7ffe5b5e20 community-service "docker-entrypoint.s…" 16 hours ago Up 2 hours 0.0.0.0:8080->8080/tcp community-service
```

Get the container id `7c7ffe5b5e20` and run the following command to shell into it.

```sh
# for example
docker exec -it 7c7ffe5b5e20 /bin/sh
```

### Generate migration

Run the following command to generate the migration file

```sh
npx prisma migrate dev --name add_post_rating_column
```

This will run the migration and update the prisma client. You can find the newest migration file under the `prisma/migrations` folder.

## Scenario 2: You want to rename an existing column

Let's say we want to rename the `rating` field to `score`.

So let's head into the `schema.prisma` file and update our Post

```prisma
model Post {
  - rating Int @default(0) //remove this line
  + score Int @default(0)  // add this line
  //... other fields
}
```

If you follow the above steps and run the migration, you will loose all data. Because prisma will drop the current column and add the new column in the migration file.

The generated migration file looks like this.

```sql
ALTER table POST DROP COLUMN "rating";

ALTER TABLE "Post" ADD COLUMN "score" INTEGER NOT NULL DEFAULT 0;
```

Now, that's a problem. We only want to rename the column. Not drop it.

### Solution

We need to edit the migration files manually. We can only generate the migration file by passing the `--create-only` flag to the migration generation command.

```sh
npx prisma migrate dev --name rename_post_rating_to_score --create-only
```

After running the command if you go inside the migrations folder, you will see the new migration file.

Now change the sql command

```sql
ALTER TABLE POST RENAME COLUMN "rating" TO "score";
```

And now run the migration

```sh
npx prisma migrate dev
```

This should work properly.

## Scenario 3: Rollback migration

Let's say you changed the schema in a way that worked locally but failed in production. Now you need to rollback the most recent migration.

If want to rollback some specific migration, you can't do it directly with prisma.

You need to do it manually.

First, you need to delete the specific migration file from the `prisma/migrations` folder.

Then, you need to delete the migration record from the `prisma/migration` table.

```sql
DELETE FROM "Migration" WHERE name = 'add_post_rating_column';
```

Now, you can run the migration again.

```sh
npx prisma migrate dev
```

Now the bad migration is gone. But you also lost the data. So you need to restore the data from the backup.

## Seed data:

First, you need to ssh into the container (You already know this)

The database migration data should be copied into `<project_root_folder>/prisma/data/migration`.

Then run the following command to seed the data

```bash
node prisma/scripts/gcMigrationMain.js
```

Now you are back up with proper data and a working migration.
