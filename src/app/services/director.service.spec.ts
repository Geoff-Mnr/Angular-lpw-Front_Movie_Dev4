import { TestBed } from "@angular/core/testing";

import { DirectorService } from "./DirectorService";

describe("DirectorService", () => {
  let service: DirectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectorService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
