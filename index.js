/**
 * List of all available types and their values.
 */
const LOG_TYPES = {
    'NONE': 0,
    'ERROR': 1,
    'NORMAL': 2,
    'DEBUG': 3,
    'DEBUGALL': 4
};

/**
 * Logger object to keep the original log and error functions.
 *
 * @type {{ log: Function, error: Function }}
 */
const subLogger = {
    log: console.log,
    error: console.error
};

/**
 * Gets the current time in a format that can be logged.
 *
 * @returns {string}
 */
 function logTime() {
    let date = new Date();

    let milliseconds = date.getMilliseconds();
    if (milliseconds === 0) { milliseconds = '---'; }
    else if (milliseconds < 10) { milliseconds = `00${milliseconds}`; }
    else if (milliseconds < 100) { milliseconds = `0${milliseconds}`; }

    return '[' + date.toLocaleDateString('fr-FR', {
        'timeZone': 'Europe/Dublin',
        'day': '2-digit',
        'month': '2-digit',
        'year': 'numeric',
        'hour': '2-digit',
        'minute': '2-digit',
        'second': '2-digit',
        'hour12': false
    }).replace(' à ', ' ') + ' GMT]';
}

/**
 * Logger class. Extend functionalities from basic console.
 */
class Logger {
    /**
     * Type of logs to display.
     *
     * @type {LOG_TYPES[keyof LOG_TYPES]}
     */
    logType = LOG_TYPES.NORMAL;

    /**
     * Creates a new logger.
     *
     * @param {keyof LOG_TYPES} [type] - Type of logs to display. Defaults to "NORMAL".
     */
    constructor(type) {
        this.logType = LOG_TYPES[type] || LOG_TYPES.NORMAL;
    }

    /**
     * Prints to `stdout` with newline. Multiple arguments can be passed, with the first used as the primary message and all additional used as substitution values similar to `printf(3)` (the arguments are all passed to `util.format()`).
     *
     * @param  {...any} args - Elements to log.
     */
    log(...args) {
        if (!this || this.logType >= LOG_TYPES.NORMAL) {
            subLogger.log(logTime(), '[INFO]', ...args);
        }
    }

    /**
     * Prints to `stdout` with newline. Multiple arguments can be passed, with the first used as the primary message and all additional used as substitution values similar to `printf(3)` (the arguments are all passed to `util.format()`).
     *
     * @param  {...any} args - Elements to log.
     */
    error(...args) {
        if (!this || this.logType >= LOG_TYPES.ERROR) {
            subLogger.error(logTime(), '[ERROR]', ...args);
        }
    }


    /**
     * Prints to `stdout` with newline. Multiple arguments can be passed, with the first used as the primary message and all additional used as substitution values similar to `printf(3)` (the arguments are all passed to `util.format()`).
     *
     * @param  {...any} args - Elements to log.
     */
    debug(...args) {
        if (this && this.logType >= LOG_TYPES.DEBUG) {
            subLogger.log(logTime(), '[DEBUG]', ...args);
        }
    }

    /**
     * Prints to `stdout` with newline. Multiple arguments can be passed, with the first used as the primary message and all additional used as substitution values similar to `printf(3)` (the arguments are all passed to `util.format()`).
     *
     * @param  {...any} args - Elements to log.
     */
    debugall(...args) {
        if (this && this.logType >= LOG_TYPES.DEBUGALL) {
            subLogger.log(logTime(), '[DEBUG]', ...args);
        }
    }

    /**
     * Assign functions to an existing logger.
     *
     * @param {Logger} logger 
     */
    static assign(logger) {
        const nLogger = new Logger();

        logger.logType = LOG_TYPES.NORMAL;
        logger.log = nLogger.log.bind(logger);
        logger.error = nLogger.error.bind(logger);
        logger.debug = nLogger.debug.bind(logger);
        logger.debugall = nLogger.debugall.bind(logger);
    }
}
  
module.exports = { Logger, LOG_TYPES, logTime };
