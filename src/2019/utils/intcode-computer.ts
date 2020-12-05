import readlineSync from 'readline-sync';

enum MODE {
  POSITION = 0,
  IMMEDIATE = 1,
}

export class IntcodeComputer {
  private internalMemory: number[];

  private currentAddress: number;

  private nextIncrement = 0;

  private mode: MODE[] = [0, 0, 0];

  private hasJumped = false;

  constructor(initialMemory: number[] = []) {
    this.internalMemory = [...initialMemory];
    this.currentAddress = 0;
    this.hasJumped = false;
  }

  reset(memory: number[]): void {
    this.internalMemory = [...memory];
    this.currentAddress = 0;
    this.hasJumped = false;
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

  getAddress(offset: number): number {
    return this.get(this.currentAddress + offset);
  }

  getValue(offset: number): number {
    switch (this.getMode(offset)) {
      case MODE.POSITION:
        return this.get(this.get(this.currentAddress + offset));

      case MODE.IMMEDIATE:
        return this.get(this.currentAddress + offset);

      default:
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`Unknown mode: ${this.mode}`);
    }
  }

  private add(): void {
    this.set(this.getAddress(3), this.getValue(1) + this.getValue(2));

    this.nextIncrement = 4;
  }

  private multiply(): void {
    this.set(this.getAddress(3), this.getValue(1) * this.getValue(2));

    this.nextIncrement = 4;
  }

  private input(): void {
    process.stdin.read();

    const input = readlineSync.question('Input: ');
    this.set(this.getAddress(1), Number(input));

    this.nextIncrement = 2;
  }

  private output(): void {
    // eslint-disable-next-line no-console
    console.log('Output: ', this.getValue(1));

    this.nextIncrement = 2;
  }

  private jumpIfTrue(): void {
    if (this.getValue(1) !== 0) {
      this.currentAddress = this.getValue(2);
      this.hasJumped = true;
    }

    this.nextIncrement = 3;
  }

  private jumpIfFalse(): void {
    if (this.getValue(1) === 0) {
      this.currentAddress = this.getValue(2);
      this.hasJumped = true;
    }

    this.nextIncrement = 3;
  }

  private increment(): void {
    if (this.hasJumped) {
      this.hasJumped = false;
    } else {
      this.currentAddress += this.nextIncrement;
    }
  }

  private lessThan(): void {
    this.set(this.getAddress(3), this.getValue(1) < this.getValue(2) ? 1 : 0);

    this.nextIncrement = 4;
  }

  private equals(): void {
    this.set(this.getAddress(3), this.getValue(1) === this.getValue(2) ? 1 : 0);

    this.nextIncrement = 4;
  }

  private setMode(modes: number[]) {
    const [third, second, first] = modes;

    this.mode = [first, second, third];
  }

  private getMode(offset: number): MODE {
    return this.mode[offset - 1];
  }

  next(): boolean {
    const instruction = `${this.get()}`.padStart(5, '0');
    const modes = instruction.split('').slice(0, 3).map(Number);
    const opcode = Number(instruction.split('').slice(-2).join(''));

    this.setMode(modes);

    switch (opcode) {
      case 1:
        this.add();
        break;

      case 2:
        this.multiply();
        break;

      case 3:
        this.input();
        break;

      case 4:
        this.output();
        break;

      case 5:
        this.jumpIfTrue();
        break;

      case 6:
        this.jumpIfFalse();
        break;

      case 7:
        this.lessThan();
        break;

      case 8:
        this.equals();
        break;

      case 99:
        return false;

      default:
        throw new Error(
          `Unknown Opcode: ${opcode} as address ${this.currentAddress}.\n\n${JSON.stringify(
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
