import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSpecificationsCars1696961887036
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'specifications_cars',
        columns: [
          {
            name: 'car_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'specification_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            referencedTableName: 'cars',
            referencedColumnNames: ['id'],
            columnNames: ['car_id'],
            name: 'FK_Car_SpecificationCar',
            onUpdate: 'SET NULL',
            onDelete: 'SET NULL',
          },
          {
            referencedTableName: 'specifications',
            referencedColumnNames: ['id'],
            columnNames: ['specification_id'],
            name: 'FK_Specification_SpecificationCar',
            onUpdate: 'SET NULL',
            onDelete: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('specifications_cars');
  }
}
