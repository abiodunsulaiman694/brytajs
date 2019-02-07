//Student Class - Represents a student

class Student {
	constructor(name, course, start_date, reg_no){
		this.name = name;
		this.course = course;
		this.start_date = start_date;
		this.reg_no = reg_no;
	}
}

//UI Class - Represents UI Tasks
class UI {
	static displayStudents() {
		// const storedStudents = [
		// 	{
		// 		name: 'John Happy',
		// 		course: 'Website Development',
		// 		start_date: '2019-02-04',
		// 		reg_no: '1234'
		// 	},
		// 	{
		// 		name: 'Janet Emeka',
		// 		course: 'Mobile App Development',
		// 		start_date: '2019-01-04',
		// 		reg_no: '1235'
		// 	},
		// 	{
		// 		name: 'Ali Ahmed',
		// 		course: 'Artificial Intelligence',
		// 		start_date: '2019-03-04',
		// 		reg_no: '1236'
		// 	}
		// ]
		//const students = storedStudents;
		const students = Store.getStudents();

		students.forEach((student) => UI.addStudent(student))
	}


	static addStudent(student) {
		const list = document.getElementById('students');
		
		const row = document.createElement('tr');
		row.innerHTML = `
			<td>${student.name}</td>
			<td>${student.course}</td>
			<td>${student.start_date}</td>
			<td>${student.reg_no}</td>
			<td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
		`;
		list.appendChild(row);
	}
	static deleteStudent(el) {
		if (el.classList.contains('delete')) {
			el.parentElement.parentElement.remove();
			UI.showAlert('Student deleted successfully', 'success');
		
		}
	}
	static clearForm() {
		document.getElementById('name').value = '';
		document.getElementById('course').value = '';
		document.getElementById('start_date').value = '';
		document.getElementById('reg_no').value = '';
	}
	static showAlert(message, className) {
		if (document.querySelector('.alert')) {
			document.querySelector('.alert').remove()
		}
		const div = document.createElement('div');
		div.className = `alert alert-${className}`;
		div.appendChild(document.createTextNode(message));
		const container = document.querySelector('.container');
		const form = document.querySelector('#students-form');
		container.insertBefore(div, form);

		setTimeout(() => {
			div.remove()
		}, 4000);
	}
}

// Store Class - Handles storage in db

class Store {
	static getStudents() {
		let students;
		if (localStorage.getItem('students') === null) {
			students = [];
		} else {
			students = JSON.parse(localStorage.getItem('students'));
		}
		return students;
	}
	static addStudent(student) {
		const students = Store.getStudents();
		students.push(student);
		localStorage.setItem('students', JSON.stringify(students));
	}
	static deleteStudent(name) {
		const students = Store.getStudents();
		students.map((student, index) => {
			if (student.reg_no === name) {
				students.splice(index, 1);
			}
		});
		localStorage.setItem('students', JSON.stringify(students));
	}
}

//Event - Display students

document.addEventListener('DOMContentLoaded', UI.displayStudents);

// Event - Add a new Student
document.getElementById('students-form').addEventListener('submit', (e) => {
	//prevent form submission default
	e.preventDefault();
	//get form values
	const name = document.getElementById('name').value;
	const course = document.getElementById('course').value;
	const start_date = document.getElementById('start_date').value;
	const reg_no = document.getElementById('reg_no').value;

	if (name == "" || course == "" || start_date == "" || reg_no == "") {
		//Please, fill in all fields
		UI.showAlert('Please, fill in all fields', 'danger');

	} else {
		const student = new Student(name, course, start_date, reg_no);
		//console.log(student);
		UI.addStudent(student);
		Store.addStudent(student);
		UI.showAlert('Student added successfully', 'success');
		UI.clearForm();
	}

	
})
// Remove a Student
document.getElementById('students').addEventListener('click', (e) => {
	UI.deleteStudent(e.target);

	//remove from storage
	Store.deleteStudent(e.target.parentElement.previousElementSibling.textContent)
});

