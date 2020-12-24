<?php


namespace React\Api;


class LoginRoute
{
    private const FORM_KEY = 'form';

    /**
     * Get Saved Form Data
     * @return ?array
     */
    public function getData(): ?array {
        return !empty($_SESSION[self::FORM_KEY]) ? $_SESSION[self::FORM_KEY] : null;
    }

    /**
     * Save Form Data
     * @param array $data Form database
     */
    public function setData(array $data): void {
        $_SESSION[self::FORM_KEY] = $data;
    }
}