import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMagementComponent } from './admin-magement.component';

describe('AdminMagementComponent', () => {
  let component: AdminMagementComponent;
  let fixture: ComponentFixture<AdminMagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
