export class IntcodeComputer {
  private internalMemory: number[];

  private currentAddress: number;

  private nextIncrement = 0;

  constructor(initialMemory: number[] = []) {
    this.internalMemory = [...initialMemory];
    this.currentAddress = 0;
  }

  reset(memory: number[]): void {
    this.internalMemory = [...memory];
    this.currentAddress = 0;
  }

  set memory(memory: number[]) {
    this.internalMemory = [...memory];
  }

  get memory(): number[] {
    return this.internalMemory;
  }

  set(address: number, value: number): void {
    this.internalMemory[address] = value;
  }

  get(address?: number): number {
    return this.internalMemory[address ?? this.currentAddress];
  }

  add(): void {
    this.set(
      this.get(this.currentAddress + 3),
      this.get(this.get(this.currentAddress + 1)) + this.get(this.get(this.currentAddress + 2)),
    );

    this.nextIncrement = 4;
  }

  multiply(): void {
    this.set(
      this.get(this.currentAddress + 3),
      this.get(this.get(this.currentAddress + 1)) * this.get(this.get(this.currentAddress + 2)),
    );

    this.nextIncrement = 4;
  }

  increment(): void {
    this.currentAddress += this.nextIncrement;
  }

  next(): boolean {
    switch (this.get()) {
      case 1:
        this.add();
        break;

      case 2:
        this.multiply();
        break;

      case 99:
        return false;

      default:
        throw new Error(
          `Unknown Opcode: ${this.get()} as address ${this.currentAddress}.\n\n${JSON.stringify(
            this.internalMemory,
          )}`,
        );
    }

    this.increment();
    return true;
  }

  run(): number[] {
    let keepRunning = true;

    do {
      keepRunning = this.next();
    } while (keepRunning);

    return this.internalMemory;
  }
}
