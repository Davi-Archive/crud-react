import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { Button, Modal } from 'react-bootstrap';

class Alunos extends React.Component<{}, { alunos: any, id: number, email: any, nome: string, show: boolean}> {
    constructor(props: any) {
        super(props);
        this.state = {
            alunos: [
                { id: 1, nome: 'Davi', email: "okaychamp@tw.com" },
                { id: 2, nome: 'Marcos', email: "okaiychamp@tw.com" }
            ],
            id: 0,
            email: '',
            nome: '',
            show: false,
        }
        this.deletarAluno = this.deletarAluno.bind(this);
        this.buscarAluno = this.buscarAluno.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.submit = this.submit.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    componentDidMount() {
        this.buscarAluno();
    }

    componentWillUnmount() {
        console.log('desmontou')
    }
    setNome(e: any) {
        this.setState({ nome: e.target.value })
    }
    setEmail(e: any) {
        this.setState({ email: e.target.value })
    }

    buscarAluno() {
        fetch('http://localhost:5000/alunos')
            .then(resposta => resposta.json())
            .then(dados => {
                this.setState({ alunos: dados })
            })
    }


    deletarAluno(id: string) {
        fetch(`http://localhost:5000/alunos/${id}`, { method: 'DELETE' })
            .then(resposta => {
                if (resposta.ok) {
                    this.buscarAluno();
                }
            })
    }
    cadastrarAluno(aluno: object) {
        fetch('http://localhost:5000/alunos/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(aluno)
        })
            .then(resposta => {
                if (resposta.ok) {
                    this.buscarAluno();
                } else {
                    alert('Não foi possível adicionar aluno')
                }
            })
    }
    atualizarAluno(aluno: any) {
        fetch(`http://localhost:5000/alunos/${aluno.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(aluno)
        })
            .then(resposta => {
                if (resposta.ok) {
                    this.buscarAluno();
                } else {
                    alert('Não foi possível adicionar aluno')
                }
            })
    }

    carregarDados = (id: string) => {
        fetch(`http://localhost:5000/alunos/${id}`, { method: 'GET' })
            .then(resposta => resposta.json())
            .then(aluno => {
                this.setState({
                    id: aluno.id,
                    nome: aluno.nome,
                    email: aluno.email
                })

            }).then(this.handleShow)
    }

    submit() {
        if (this.state.id === 0) {
            let aluno: any = {
                nome: this.state.nome,
                email: this.state.email
            }
            return this.cadastrarAluno(aluno)
        } else {
            let aluno = {
                id: this.state.id,
                nome: this.state.nome,
                email: this.state.email
            }
            return this.atualizarAluno(aluno)
        }
    }

    resetForm() {
        this.setState({
            id: 0,
            nome: '',
            email: '',
            show: true
        })
    }

    renderTabela() {
        return (
            <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {
                        this.state.alunos.map((aluno: any) =>
                            <tr key={aluno.id.toString()}>
                                <td>{aluno.id}</td>
                                <td>{aluno.nome}</td>
                                <td>{aluno.email}</td>
                                <td><Button variant="success" onClick={() => this.carregarDados(aluno.id)}>Atualizar</Button>  <Button variant="danger" onClick={() => this.deletarAluno(aluno.id)}>Excluir</Button>{' '}</td>
                            </tr>
                        )
                    }

                </tbody>
            </Table>
        )

    }
    handleClose() {
        this.setState({
            show: false
        })
    }
    handleShow() {
        this.setState({
            show: true
        })
    }

    cadastrarForm() {
        return (
            <>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Novo Usuário</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>ID</Form.Label>
                                <Form.Control type="text" placeholder="ID" value={this.state.id} readOnly disabled/>
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" placeholder="Nome do Aluno" value={this.state.nome} onChange={this.setNome} />
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Coloque o email" value={this.state.email} onChange={this.setEmail} />
                                    <Form.Text className="text-muted">
                                        Utilize o seu melhor e-mail do aluno.
                                    </Form.Text>
                                </Form.Group>
                            </Form.Group>
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" onClick={this.submit}>
                            Salvar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Button variant="info" onClick={this.resetForm}>
                    Novo
                </Button>
            </>
        )

    }

    render() {
        return (
            <div>
                {this.cadastrarForm()}
                {this.renderTabela()}
            </div>
        )
    }


}

export default Alunos;