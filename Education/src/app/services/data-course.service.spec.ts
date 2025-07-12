import { TestBed } from '@angular/core/testing';

import { DataCourseService } from './data-course.service';

describe('DataCourseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataCourseService = TestBed.get(DataCourseService);
    expect(service).toBeTruthy();
  });
});
