import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('files', (table) => {
    table
      .dateTime('uploadedAt')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .dateTime('updatedAt')
      .defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('files', (table) => {
    table.dropColumn('uploadedAt');
    table.dropColumn('updatedAt');
  });
}
