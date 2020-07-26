package http

import "testing"

//func Test_tokenCollection_createHash(t *testing.T) {
//	type args struct {
//		str string
//	}
//	tests := []struct {
//		name string
//		to   tokenCollection
//		args args
//		want string
//	}{
//		// TODO: Add test cases.
//	}
//	for _, tt := range tests {
//		t.Run(tt.name, func(t *testing.T) {
//			if got := tt.to.createHash(tt.args.str); got != tt.want {
//				t.Errorf("createHash() = %v, want %v", got, tt.want)
//			}
//		})
//	}
//}

func Test_tokenCollection_removeToken(t *testing.T) {
	type args struct {
		token string
	}
	tests := []struct {
		name string
		c    tokenCollection
		args args
	}{
		struct {
			name string
			c    tokenCollection
			args args
		}{name: "i want to remove 'b'", c: tokenCollection{"a", "b", "c"}, args: struct{ token string }{token: "b"}},
		struct {
			name string
			c    tokenCollection
			args args
		}{name: "i want to remove 'as'", c: tokenCollection{"a", "s", "b", "as", "as df", "c"}, args: struct{ token string }{token: "as"}},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			l := len(tt.c)
			tt.c.removeToken(tt.args.token)
			if len(tt.c) != l-1 {
				t.Fail()
				return
			}
		})
	}
}

func Test_tokenCollection_saveToken(t *testing.T) {
	type args struct {
		token string
	}
	tests := []struct {
		name string
		to   tokenCollection
		args args
	}{
		struct {
			name string
			to   tokenCollection
			args args
		}{name: "i want to add 'c'", to: tokenCollection{"a", "b"}, args: struct{ token string }{token: "c"}},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := tt.to.saveToken(tt.args.token)

			if err != nil {
				t.Fail()
			}
			if len(tt.to) != 3 {
				t.Fail()
			}
			if tt.to[2] != tt.args.token {
				t.Fail()
			}
		})
	}
}

func Test_tokenCollection_saveToken_error(t *testing.T) {
	type args struct {
		token string
	}
	tests := []struct {
		name string
		to   tokenCollection
		args args
	}{
		struct {
			name string
			to   tokenCollection
			args args
		}{name: "i want to add 'b' and receive error", to: tokenCollection{"a", "b"}, args: struct{ token string }{token: "b"}},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := tt.to.saveToken(tt.args.token)
			if err != NotUniqueToken {
				t.Fail()
			}
		})
	}
}
