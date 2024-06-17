import { expect } from 'chai';
import { User } from "../models/User.js";
import UserController from "../controllers/User.js";
import sinon from 'sinon';

describe('UserController', () => {
  afterEach(() => {
    sinon.restore();
  });

  it("deve encontrar um usuário", async () => {
    const mockUser = { id: 1, name: "Usuário Teste" };
    const request = { params: { id: 1 } };
    const response = { json: sinon.stub().returns(mockUser) };

    sinon.stub(User, 'findById').returns(Promise.resolve(mockUser));

    await UserController.find(request, response);

    expect(response.json.calledWith(mockUser)).to.be.true;
  });

  it("deve criar um usuário", async () => {
    const mockUser = { id: 1, name: "Usuário Teste" };
    const request = { body: mockUser };
    const response = {
      json: sinon.stub().returns(mockUser),
      status: sinon.stub().returns({ json: sinon.stub() }),
    };

    sinon.stub(User, 'create').returns(Promise.resolve(mockUser));

    await UserController.create(request, response);

    expect(response.status.calledWith(201)).to.be.true;
    expect(response.json.calledWith(mockUser)).to.be.true;
  });

  it("deve atualizar um usuário", async () => {
    const mockUser = { id: 1, name: "Usuário Teste" };
    const request = { params: { id: 1 }, body: mockUser };
    const response = { json: sinon.stub().returns(mockUser) };

    sinon.stub(User, 'update').returns(Promise.resolve([1]));

    await UserController.update(request, response);

    expect(response.json.calledWith(mockUser)).to.be.true;
  });

  it("deve deletar um usuário", async () => {
    const request = { params: { id: 1 } };
    const response = { status: sinon.stub().returns({ send: sinon.stub() }) };

    sinon.stub(User, 'destroy').returns(Promise.resolve(1));

    await UserController.delete(request, response);

    expect(response.status.calledWith(204)).to.be.true;
  });

  it("deve fazer login de um usuário", async () => {
    const mockUser = { id: 1, name: "Usuário Teste", password: "senha" };
    const request = { body: { name: "Usuário Teste", password: "senha" } };
    const response = { json: sinon.stub().returns({ token: "token" }) };

    sinon.stub(User, 'findOne').returns(Promise.resolve(mockUser));

    await UserController.login(request, response);

    expect(response.json.calledWith({ token: "token" })).to.be.true;
  });
});