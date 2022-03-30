export const types = {
  BETWEEN: "BETWEEN",
  GREATER: "GREATER",
  GREATER_OR_EQUAL: "GREATER_OR_EQUAL",
  LESS: "LESS",
  LESS_OR_EQUAL: "LESS_OR_EQUAL",
  IS_EVEN: "IS_EVEN",
  IS_HEX: "IS_HEX",
  NOT_A_NUMBER: "NOT_A_NUMBER",
};

//TODO HEX regex

export const Utilities = {
  methods: {
    [types.BETWEEN]: function ({ value, min, max }) {
      return !isNaN(value) && value >= min && value <= max;
    },
    [types.GREATER]: function ({ value, number }) {
      return !isNaN(value) && value > number;
    },
    [types.GREATER_OR_EQUAL]: function ({ value, number }) {
      return !isNaN(value) && value >= number;
    },
    [types.LESS]: function ({ value, number }) {
      return !isNaN(value) && value < number;
    },
    [types.LESS_OR_EQUAL]: function ({ value, number }) {
      return !isNaN(value) && value <= number;
    },
    [types.IS_EVEN]: function ({ value }) {
      return !isNaN(value) && value % 2 === 0;
    },
    [types.IS_HEX]: function ({ value }) {
      return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
    },
    [types.NOT_A_NUMBER]: function ({ value }) {
      return !isNaN(value);
    },
  },
};
