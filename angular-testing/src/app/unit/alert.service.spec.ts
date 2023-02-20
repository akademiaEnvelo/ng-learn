import { EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AlertService } from './alert.service';

describe('AlertService', () => {
  it('error', async () => {
    // arrange
    await TestBed.configureTestingModule({
      providers: [AlertService],
    });

    const service = TestBed.inject(EnvironmentInjector).get(AlertService);

    jest.spyOn(window, 'alert');

    // act
    service.error('Error!');

    // assert
    expect(window.alert).toBeCalledWith('Error!');
    // expect(window.alert).not.toBeCalledWith('a może taki!');
  });
});
