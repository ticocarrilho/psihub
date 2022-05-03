module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS contrato_update;`, { transaction: t }),
        queryInterface.sequelize.query(`CREATE TRIGGER contrato_update
        AFTER UPDATE ON pacientes
        FOR EACH ROW
        BEGIN
            DECLARE psicologo_id INT(1);
            DECLARE inicioContrato DATETIME;
            DECLARE finalContrato DATETIME;
            DECLARE uuid CHAR(36);
            DECLARE createdAt DATETIME;
        IF NEW.contrato_id IS NOT NULL AND !(NEW.contrato_id <=> OLD.contrato_id) THEN

          SELECT c.psicologo_id, c.inicioContrato, c.finalContrato, c.uuid, c.createdAt INTO psicologo_id, inicioContrato, finalContrato, uuid, createdAt FROM contratos c WHERE id=NEW.contrato_id LIMIT 1;

          WHILE inicioContrato <= finalContrato DO

            INSERT IGNORE INTO consultas (startDate, endDate, paciente_id, psicologo_id, uuid, createdAt, updatedAt, pacienteConfirmado, psicologoConfirmado, reagendada)
                VALUES(inicioContrato, ADDDATE(inicioContrato, INTERVAL 1 HOUR), NEW.id, psicologo_id, uuid, createdAt, createdAt, 1, 1, 0);

            SET inicioContrato = ADDDATE(inicioContrato, INTERVAL 1 WEEK);

          END WHILE;
        END IF;

        END;`)
      ])
    });
  },
  down: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.query('DROP TRIGGER IF EXISTS contrato_update;');
  }
};