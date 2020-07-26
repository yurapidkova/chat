package http

import (
	"crypto"
	"encoding/base64"
)

type tokenCollection []string

func (*tokenCollection) createHash(str string) string {
	hash := crypto.SHA512.New()
	hash.Write([]byte(str))
	return base64.URLEncoding.EncodeToString(hash.Sum(nil))
}

func (c *tokenCollection) saveToken(token string) {
	*c = append(*c, token)
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
