import { IEmailerPort } from "../../src/application/ports/services/IEmailer";



export class MockEmailer implements IEmailerPort {
  send() { }
}