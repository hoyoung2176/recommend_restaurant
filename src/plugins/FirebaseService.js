import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

import 'firebase/auth'
import store from '../store'



const POSTS = 'posts'
const PORTFOLIOS = 'portfolios'

// Setup Firebase
const config = {
	apiKey: "AIzaSyBvq1MIeEOkugWEOLCV_pWg-t14LoIWIpc",
	authDomain: "web-mobile-final.firebaseapp.com",
	databaseURL: "https://web-mobile-final.firebaseio.com",
	projectId: "web-mobile-final",
	storageBucket: "web-mobile-final.appspot.com",
	messagingSenderId: "558432609414",
	appId: "1:558432609414:web:6c1f9bc3c1de52f8"
}

firebase.initializeApp(config)
const firestore = firebase.firestore()
const storage = firebase.storage()


// Vue.prototype.$firebase = firebase

firebase.auth().onAuthStateChanged((user) => {
	// console.log('here?')
	console.log(user)

	var test = '';
	firestore.collection("user").doc(user.email).get().then(function (doc) {
		if (doc.exists) {
			test = doc.data().level;
			store.dispatch('getLevel', doc.data().level);
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
	}).catch(function (error) {
		console.log("Error getting document:", error);
	});
	store.dispatch('getUser', user, test)
})
export default {
	getPosts() {
		const postsCollection = firestore.collection(POSTS)
		return postsCollection
			.orderBy('created_at', 'desc')
			.get()
			.then((docSnapshots) => {
				return docSnapshots.docs.map((doc) => {
					let data = doc.data()
					data.created_at = new Date(data.created_at.toDate())
					return data
				})
			})
	},
	postPost(title, body) {
		return firestore.collection(POSTS).add({
			title,
			body,
			created_at: firebase.firestore.FieldValue.serverTimestamp()
		})
	},
	getPortfolios() {
		const postsCollection = firestore.collection(PORTFOLIOS)
		return postsCollection
			.orderBy('created_at', 'desc')
			.get()
			.then((docSnapshots) => {
				return docSnapshots.docs.map((doc) => {
					let data = doc.data()
					data.created_at = new Date(data.created_at.toDate())
					return data
				})
			})
	},
	postPortfolio(title, body, img) {
		return firestore.collection(PORTFOLIOS).add({
			title,
			body,
			img,
			created_at: firebase.firestore.FieldValue.serverTimestamp()
		})
	},
	// 웹 로그 기능
	logging(name, path) {
		name = name ? name : 'Anonymous user'
		return firestore.collection('LOG').add({
			name,
			path,
			time: firebase.firestore.FieldValue.serverTimestamp()
		})
	},
	// 리뷰 작성 DB 업로드
	createReview(title, star, content, nickname, fileName) {
		name = name ? name : 'Anonymous user'
		console.log(fileName)
		return firestore.collection('createReview').add({

			title,
			star,
			content,
			nickname,
			time: firebase.firestore.FieldValue.serverTimestamp()


		})
	},
	// 이미지 스토리지에 업로드
	uploades(img, uploading, uploadEnd) {
		//   console.log(img.name)
		this.fileName = img.name

		uploading = true
		console.log(uploading)
		var uploadTask = storage.ref('upload_imgs/' + img.name).put(img)
		//   console.log(img.name)

		uploadTask.on('state_changed',

			function progress(snapshot) {

				var percentage = (snapshot.bytesTransferred /
					snapshot.totalBytes) * 100;
				uploader.value = percentage;

			},
			function error(err) {

			},
			function complete() {

			}
		)
	},
	// 이미지 삭제
	deleteImages(deimg) {
		var deleteTask = firebase.storage
			.ref('upload_imgs/' + deimg.name)
			.delete()
			.then(() => {
				this.uploading = false
				this.uploadEnd = false
				this.downloadURL = ''
			})
			.catch((error) => {
				console.error(`file delete error occured: ${error}`)
			})

	},
	// 리뷰 작성 DB 업로드
	async createReview(title, star, content, nickname, imageName, email,placeid, placelocation1, placelocation2) {
		// console.log('1')
		name = name ? name : 'Anonymous user'
		return firestore.collection('createReview').add({

			title,
			star,
			content,
			nickname,
			imageName,
			email,
			placeid,
			placelocation1,
			placelocation2,
			time: firebase.firestore.FieldValue.serverTimestamp()


		})
		// console.log('3')	
	},
	// 리뷰 리스트 보여주기
	getAllReviews() {
		// console.log('2')
		var whole = [];
		firestore.collection("createReview").get()
			.then(function (querySnapshot) {
				querySnapshot.forEach(function (doc) {
					// console.log('4')
					whole.push({
						title: doc._document.proto.fields.title.stringValue,
						star: doc._document.proto.fields.star.integerValue || doc._document.proto.fields.star.doubleValue,
						imageName: doc._document.proto.fields.imageName.stringValue,
						content: doc._document.proto.fields.content.stringValue,
						email: doc._document.proto.fields.email.stringValue
					})

				})
			})
			.catch(function (error) {
				console.log("Error getting documents: ", error);
			});
		// console.log("test"+test)
		// console.log(whole)
		return whole;

	},
	// // 좋아요 누른거 확인을 위해 리뷰에서 좋아요 누른유저(likeUser)를 불러오는 함수
	// getLikeUser(){
	// 	var likeClickUsers = [];
	// 	firestore.collection("createReview").get()
	// 		.then(function (querySnapshot) {
	// 			querySnapshot.forEach(function (doc) {
	// 				// console.log(doc._document.proto.fields.likeUser.stringValue)
	// 				likeClickUsers.push({
	// 					likeUser: doc._document.proto.fields.likeUser.stringValue,
	// 				})

	// 			})
	// 		})
	// 		.catch(function (error) {
	// 			console.log("Error getting documents: ", error);
	// 		});
	// 	// console.log("test"+test)
	// 	// console.log(whole)
	// 	return likeClickUsers;

	// },

	// // 좋아요 기능
	// likeUserClick(email, reviewId) {
	// 	name = name ? name : 'Anonymous user'
	// 	return firestore.collection('Likes').add({
	// 		email,
	// 		reviewId,



	// 	})
	// },

	// 특정장소 리뷰리스트 가져오기
	getPlaceReviews(place_id) {
		var whole = [];
		
		firestore.collection("createReview").get()
			.then(function (querySnapshot) {
				querySnapshot.forEach(function (doc) {
					
					if (doc._document.proto.fields.placeid.stringValue === place_id) {
						whole.push({
							title: doc._document.proto.fields.title.stringValue, 
							star: doc._document.proto.fields.star.integerValue || doc._document.proto.fields.star.doubleValue, 
							imageName: doc._document.proto.fields.imageName.stringValue,
							content: doc._document.proto.fields.content.stringValue,
							email: doc._document.proto.fields.email.stringValue 
						})
					}

			})
		})
			.catch(function (error) {
				console.log("Error getting documents: ", error);
			});
			// console.log("test"+test)
			// console.log(whole)
			return whole;
		


	},

	userAuth(email) {
		return firestore.collection('user').doc(email).set({
			level: "guest"
		}).then(function () {
			console.log("Document successfully written!");
		})
			.catch(function (error) {
				console.error("Error writing document: ", error);
			});

	}
	,
	async getAllUser() {
		var test = [];
		await firestore.collection("user").get()
			.then(function (querySnapshot) {
				querySnapshot.forEach(function (doc) {
					// doc.data() is never undefined for query doc snapshots
					// console.log(doc.id, " => ", doc.data());
					test.push({ id: doc.id, data: doc.data().level })
				});
			})
			.catch(function (error) {
				console.log("Error getting documents: ", error);
			});
		return test;
	},
	async modifyUserLevel(email, input_level) {
		await firestore.collection("user").doc(email).update({
			level: input_level
		}).then(function () {
			console.log("Document successfully update!");
		})
			.catch(function (error) {
				console.error("Error update document: ", error);
			});

	},
	async deleteUser(email) {
		await firestore.collection("user").doc(email).delete()
			.then(function () {
				console.log("Document successfully delete!");
			})
			.catch(function (error) {
				console.error("Error update document: ", error);
			});

	},
	loginWithFacebook() {
		let provider = new firebase.auth.FacebookAuthProvider()
		return firebase.auth().signInWithPopup(provider).then(function (result) {
			let accessToken = result.credential.accessToken
			let user = result.user
			return result
		}).catch(function (error) {
			console.error('[Facebook Login Error]', error)
		})
	},
	loginWithGoogle() {
		let provider = new firebase.auth.GoogleAuthProvider()
		return firebase.auth().signInWithPopup(provider).then(function (result) {
			let accessToken = result.credential.accessToken
			let user = result.user
			return result
		}).catch(function (error) {
			console.error('[Google Login Error]', error)
		})
	},
	// 업로드한 이미지를 firebase storage에 넣기
	createReviewImageUpload(file) {
		if (typeof file.file !== 'undefined') {
			const filePath = storage.ref('images/mypic.jpg')
			filePath.put(file.file).then(function (snapshot) {
				snapshot.ref.getDownloadURL().then(url => {
					firestore.collection('images').doc('path').set({
						path: url
					})
				})
			})
		} else {
			firestore.collection('banner').doc('path').set({
				path: 'https://source.unsplash.com/random/'
			})
		}
	},
	async signInWithEmailAndPassword(email, password) {
		await firebase.auth().signInWithEmailAndPassword(email, password).then(function (result) {
			var result = firebase.auth().currentUser.email;
		}).catch(error => {
			alert('이메일 또는 비밀번호를 다시 한번 확인해주세요.')
			console.log(error)
		})
	},
	async signOut() {
		await firebase.auth().signOut().then(function () {
			alert("로그아웃 되었습니다.")
			store.dispatch('afterLogout', null)
		}).catch(error => {
			console.error("[SignOut Error]", error)
		})
	},
	async signOut2() {
		await firebase.auth().signOut().then(function () {
			store.dispatch('afterLogout', null)
		}).catch(error => {
			console.error("[SignOut Error]", error)
		})
	}
}


