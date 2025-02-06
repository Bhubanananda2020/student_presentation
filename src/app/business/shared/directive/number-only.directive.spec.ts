import { NumberOnlyDirective } from './number-only.directive';

describe('NumberOnlyDirective', () => {
  it('should create an instance', () => {
    const elRefMock = jasmine.createSpyObj('ElementRef', ['nativeElement']);
    const directive = new NumberOnlyDirective(elRefMock);
    expect(directive).toBeTruthy();
  });
});
