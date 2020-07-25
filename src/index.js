/**
 * A Named Promise Task 
 * Insipre from https://stackoverflow.com/questions/53540348/js-async-await-tasks-queue
 */
class PromiseTask {
  constructor ( context, namedWorkers ) {
    this._context = context
    this._namedWorkers = namedWorkers
    this._pending = Promise.resolve();
  }
  // task executor
  addTask = ( () => {
    let pending = Promise.resolve();

    const run = async ( name, ...values ) => {
      try {
        await pending;
      } finally {
        return this._namedWorkers[ name ].call(this._context, ...values );
      }
    }

    // update pending promise so that next task could await for it
    return ( name, ...values ) => ( pending = run( name, ...values ) )
  } )()
}

module.exports = PromiseTask