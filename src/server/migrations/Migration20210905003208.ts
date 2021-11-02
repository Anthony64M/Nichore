import { Migration } from '@mikro-orm/migrations';

export class Migration20210905003208 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "artWork" drop constraint if exists "artWork_views_check";');
    this.addSql('alter table "artWork" alter column "views" type jsonb using ("views"::jsonb);');
    this.addSql('alter table "artWork" alter column "views" drop default;');
    this.addSql('alter table "artWork" drop column "likes_length";');

    this.addSql('create table "comment" ("id" serial primary key, "message" varchar(255) not null, "artwork_id" int4 not null, "user_id" int4 not null);');

    this.addSql('alter table "comment" add constraint "comment_artwork_id_foreign" foreign key ("artwork_id") references "artWork" ("id") on update cascade;');
    this.addSql('alter table "comment" add constraint "comment_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
  }

}
