'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create Users table
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      first_name: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      last_name: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      is_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      verification_token: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      reset_token: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      reset_token_expires: {
        type: Sequelize.DATE,
        allowNull: true
      },
      failed_login_attempts: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      account_locked_until: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create People table (contacts that users give money to or receive from)
    await queryInterface.createTable('people', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      phone: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Add unique constraint for user_id and name combinations
    await queryInterface.addConstraint('people', {
      fields: ['user_id', 'name'],
      type: 'unique',
      name: 'unique_person_per_user'
    });

    // Create Transactions table
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      person_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'people',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false
      },
      is_money_received: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        comment: 'TRUE if money received, FALSE if money given'
      },
      transaction_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      category: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      payment_method: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      is_settled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        comment: 'For tracking if a debt has been settled'
      },
      reminder_date: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'Optional date for reminders about unpaid debts'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create indexes for better query performance
    await queryInterface.addIndex('transactions', ['user_id'], {
      name: 'idx_transactions_user_id'
    });

    await queryInterface.addIndex('transactions', ['person_id'], {
      name: 'idx_transactions_person_id'
    });

    await queryInterface.addIndex('transactions', ['transaction_date'], {
      name: 'idx_transactions_transaction_date'
    });

    await queryInterface.addIndex('people', ['user_id'], {
      name: 'idx_people_user_id'
    });

    // Add full-text search index for transactions (if PostgreSQL)
    // This enables efficient searching through transaction descriptions
    if (queryInterface.sequelize.options.dialect === 'postgres') {
      await queryInterface.sequelize.query(`
        CREATE INDEX idx_transactions_description_search ON transactions USING gin(to_tsvector('english', description));
      `);
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Drop tables in reverse order to avoid foreign key constraint issues
    await queryInterface.dropTable('transactions');
    await queryInterface.dropTable('people');
    await queryInterface.dropTable('users');
  }
};