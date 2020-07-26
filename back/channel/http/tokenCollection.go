package http

import (
	"crypto"
	"encoding/base64"
	"errors"
)

type tokenCollection []string

var NotUniqueToken = errors.New("not unique token")

func (*tokenCollection) createHash(str string) string {
	hash := crypto.SHA512.New()
	hash.Write([]byte(str))
	return base64.URLEncoding.EncodeToString(hash.Sum(nil))
}

func (c *tokenCollection) saveToken(token string) error {
	if isValid(token, *c) {
		*c = append(*c, token)
		return nil
	}
	return NotUniqueToken
}

func (c *tokenCollection) removeToken(token string) {
	for index, curTok := range *c {
		if token == curTok {
			l := len(*c) - 1
			(*c)[index] = (*c)[l]
			(*c)[l] = ""
			*c = (*c)[:l]
			break
		}
	}
}

func isValid(token string, c tokenCollection) bool {

	for _, t := range c {
		if t == token {
			return false
		}
	}

	return true
}
