import { Migration } from '@mikro-orm/migrations';

export class Migration20210811224042 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" serial primary key, "name" varchar(255) not null, "username" varchar(255) not null, "password" varchar(255) not null, "email" varchar(255) not null, "user_image" varchar(255) null, "bio" varchar(255) null, "joined_on" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "social" jsonb not null);');

    this.addSql('create table "artWork" ("id" serial primary key, "title" varchar(255) not null, "tags" jsonb not null, "image" jsonb not null, "description" varchar(255) not null default \'\', "likes_length" int4 null, "views" jsonb not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "author_id" int4 not null);');

    this.addSql('create table "artworkCollection" ("id" serial primary key, "title" varchar(255) not null, "tags" jsonb not null, "cover" jsonb not null, "images" jsonb not null, "description" varchar(255) not null default \'\', "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "author_id" int4 not null);');

    this.addSql('create table "like" ("id" serial primary key, "artwork_id" int4 not null, "user_id" int4 not null);');

    this.addSql('create table "users_following" ("user_1_id" int4 not null, "user_2_id" int4 not null);');
    this.addSql('alter table "users_following" add constraint "users_following_pkey" primary key ("user_1_id", "user_2_id");');

    this.addSql('alter table "artWork" add constraint "artWork_author_id_foreign" foreign key ("author_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "artworkCollection" add constraint "artworkCollection_author_id_foreign" foreign key ("author_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "like" add constraint "like_artwork_id_foreign" foreign key ("artwork_id") references "artWork" ("id") on update cascade;');
    this.addSql('alter table "like" add constraint "like_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "users_following" add constraint "users_following_user_1_id_foreign" foreign key ("user_1_id") references "users" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "users_following" add constraint "users_following_user_2_id_foreign" foreign key ("user_2_id") references "users" ("id") on update cascade on delete cascade;');
  }

}
