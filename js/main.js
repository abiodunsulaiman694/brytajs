class UI{

	//JSON - JavaScript Object Notation

	 static displayStudents() {
		// const studentStore = [
		// 	{
		// 		name: 'John Adams',
		// 		course: 'JavaScript',
		// 		start_date: '2019-02-06'
		// 	},
		// 	{
		// 		name: 'AdaObi Emeka',
		// 		course: 'React JS',
		// 		start_date: '2019-01-06'
		// 	},
		// 	{
		// 		name: 'Ali Joseph',
		// 		course: 'Node JS',
		// 		start_date: '2019-01-06'
		// 	}
		// ]
		//const students = studentStore
		const students = Database.getStudents();

		students.map((student) => {
			UI.addStudent(student);
		})
	}

	static addStudent(student) {
		const list = document.getElementById('student-list');
		const row = document.createElement('tr');
		row.innerHTML = `
			<td>${student.name}</td>
			<td>${student.course}</td>
			<td>${student.start_date}</td>
			<td>
				<button type="button" class="btn btn-danger btn-sm delete">
					X
				</button>
			</td>
		`
		list.appendChild(row);
	}
	static clearForm() {
		document.getElementById('name').value = '';
		document.getElementById('course').value = '';
		document.getElementById('start_date').value = '';
	}
	static deleteStudent(el) {
		if (el.classList.contains('delete')) {
			el.parentElement.parentElement.remove();
		}
	}
	static showAlert(message, status) {
		const div = document.createElement('div');
		div.className = `alert alert-${status}`
		div.appendChild(document.createTextNode(message));
		const container = document.querySelector('.container');
		const form = document.querySelector('#student-form');
		container.insertBefore(div, form);
		setTimeout(() => {
			div.remove()
		}, 3000)

	}
	// //array
	// let fruits = ['Banana', 'Mango', 'Cashew'];
	// //object
	// let john = {
	// 	name: 'John',
	// 	course: 'JavaScript',
	// 	start_date: '2019-02-06'
	// }
}

class Database {
	static getStudents()
	{
		let students;
		if (localStorage.getItem('bryta_students') === null) {
			students = [];
		} else {
			students = JSON.parse(localStorage.getItem('bryta_students'));
		}
		return students;
	}
	static addStudent(student)
	{
		let students = Database.getStudents();
		students.push(student);
		localStorage.setItem('bryta_students', JSON.stringify(students))
	}
	static deleteStudent(name)
	{
		let students = Database.getStudents();
		students.map((student, index) => {
			if (student.name == name) {
				students.splice(index, 1)
			}
		})
		localStorage.setItem('bryta_students', JSON.stringify(students))
	}
}

class Student {
	constructor(name, course, start_date) {
		this.name = name;
		this.course = course;
		this.start_date = start_date;
	}
}

document.addEventListener('DOMContentLoaded', UI.displayStudents);


document.getElementById('student-form').addEventListener('submit', (e) => {
	e.preventDefault();
	const name = document.getElementById('name').value;
	const course = document.getElementById('course').value;
	const start_date = document.getElementById('start_date').value;

	
	let error_message = "";
	if (name == "") {
		error_message = error_message + "Name is required. "
	}
	if (course == "") {
		error_message = error_message + "Course is required. "
	}
	if (start_date == "") {
		error_message = error_message + "Start date is required. "
	}
	if (error_message == "") {

		//const student = new Student(name, course, start_date)
		
		const student = {
			name: name,
			course: course,
			start_date: start_date
		}

		//console.log(student);
		UI.addStudent(student);
		Database.addStudent(student);
		UI.clearForm();
		UI.showAlert('Student added successfully', 'success')
	} else {
		UI.showAlert(error_message, 'danger')
		//console.log(error_message)
	}

	

})

document.getElementById('student-list').addEventListener('click', (e) => {
	//console.log('deleted');
	UI.deleteStudent(e.target);
	Database.deleteStudent(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
	UI.showAlert('Student deleted successfully', 'success')
})