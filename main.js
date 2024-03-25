import { Subject, interval, takeUntil } from 'rxjs';

export const setUpPerfTest = (elm, counters) => {
  elm.innerHTML = 'Start';

  elm.addEventListener('click', () => {
    elm.innerHTML = 'Stop';
    const stop$ = new Subject();

    interval(1)
      .pipe(takeUntil(stop$))
      .subscribe(
        val => counters.forEach(
          ctr => ctr.innerHTML = val
        )
      );

    elm.addEventListener('click', () => {
      stop$.next();
      setUpPerfTest(elm, counters);
    }, { once: true });
  }, { once: true });
}

setUpPerfTest(document.querySelector('#start'), [...document.querySelectorAll('.counter')])
