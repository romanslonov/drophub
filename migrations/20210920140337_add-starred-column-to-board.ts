import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('boards', (table) => {
    table.boolean('starred').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('boards', (table) => {
    table.dropColumn('starred');
  });
}
