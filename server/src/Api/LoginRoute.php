<?php


namespace React\Api;


class LoginRoute
{
    private const FORM_KEY = 'profileUser';

    /**
     * Get Saved Form Data
     * @return ?array
     */
    public function getData(): ?array {
        return !empty($_SESSION[self::FORM_KEY]) ? $_SESSION[self::FORM_KEY] : null;
    }

    /**
     * Save Form Data
     * @param ?array $data Form database
     */
    private function setData(?array $data): void {
        $_SESSION[self::FORM_KEY] = $data;
    }

    /**
     * Log the user if he exists
     * - if true => Add User name in session
     * @param array $credentials [user, pwd] User and password
     * @return bool True if user is logged else false
     */
    public function logUser(array $credentials): bool{
        // $credentials = $_SESSION[self::FORM_KEY];
        //$match = true;
        $json_file = json_decode(file_get_contents('../../../database/usersData.json'));
        if (is_array($json_file)) {
            foreach ($json_file as $user) {
                if ($user->username === $credentials[0] && $user->pwd === $credentials[1]) {
                    $this->setData(['username' => $credentials[0]]);
                    return true;
                }
            }
        }
        return false;
    }

    public function logout(): bool {
        $this->setData(null);
        session_destroy();
        return $this->getData() === null;

    }
}